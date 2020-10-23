provider "aws" {
  version = "~> 2.0"
  region = "eu-central-1"
}

terraform {
  backend "s3" {
    bucket = "tf-demo-prettythings"
    key    = "terraform.tfstate"
    region = "eu-central-1"
  }
}

variable "myokaycash_https_api_url" {
  default = "https://demo-myokaycash-backend.okaythis.com/graphql"
}
variable "myokaycash_wss_api_url" {
  default = "wss://demo-myokaycash-backend.okaythis.com/graphql"
}

variable "ssl_certificate_arn" {}


resource "aws_default_vpc" "default_vpc" {
}

resource "aws_default_subnet" "default_subnet_a" {
  availability_zone = "eu-central-1a"
}

resource "aws_default_subnet" "default_subnet_b" {
  availability_zone = "eu-central-1b"
}

resource "aws_default_subnet" "default_subnet_c" {
  availability_zone = "eu-central-1c"
}

resource "aws_ecr_repository" "be_container_registry" {
  name = "okay-demo-pt-be-registry"
}
resource "aws_ecr_repository" "fe_container_registry" {
  name = "okay-demo-pt-fe-registry"
}

resource "aws_ecs_cluster" "be_cluster" {
  name = "okay-demo-pt-be-cluster"
}

resource "aws_ecs_cluster" "fe_cluster" {
  name = "okay-demo-pt-fe-cluster"
}
resource "aws_ecs_task_definition" "be_task" {
  family = "okay-demo-pt-be-task"
  container_definitions = <<DEFINITION
  [
    {
      "name": "okay-demo-pt-be-task",
      "image": "${aws_ecr_repository.be_container_registry.repository_url}",
      "essential": true,
      "environment": [
            {
                "name": "MY_OKAY_CASH_HTTPS_API_URL",
                "value": "${var.myokaycash_https_api_url}"
            },
            {
                "name": "MY_OKAY_CASH_WSS_API_URL",
                "value": "${var.myokaycash_wss_api_url}"
            }
      ],
      "healthCheck": {
        "retries": 5,
        "command": [
          "CMD-SHELL",
          "curl -f http://localhost:5000/.well-known/apollo/server-health || exit 1"
        ],
        "timeout": 2,
        "interval": 10,
        "startPeriod": 60
      },
      "portMappings": [
        {
          "containerPort": 5000,
          "hostPort": 5000
        }
      ],
      "memory": 512,
      "cpu": 256
    }
  ]
  DEFINITION
  requires_compatibilities = [
    "FARGATE"]
  memory = 512
  network_mode = "awsvpc"
  cpu = 256
  execution_role_arn = aws_iam_role.ecsTaskExecutionRole.arn
}

resource "aws_ecs_task_definition" "fe_task" {
  family = "okay-demo-pt-fe-task"
  container_definitions = <<DEFINITION
  [
    {
      "name": "okay-demo-pt-fe-task",
      "image": "${aws_ecr_repository.fe_container_registry.repository_url}",
      "essential": true,
      "environment": [],
      "healthCheck": {
        "retries": 5,
        "command": [
          "CMD-SHELL",
          "curl -f http://localhost:3000 || exit 1"
        ],
        "timeout": 2,
        "interval": 10,
        "startPeriod": 60
      },
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000
        }
      ],
      "memory": 512,
      "cpu": 256
    }
  ]
  DEFINITION
  requires_compatibilities = [
    "FARGATE"]
  memory = 512
  network_mode = "awsvpc"
  cpu = 256
  execution_role_arn = aws_iam_role.ecsTaskExecutionRole.arn
}

resource "aws_iam_role" "ecsTaskExecutionRole" {
  name = "ecsTaskExecutionRoleOkayBePT"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}
data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = [
      "sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = [
        "ecs-tasks.amazonaws.com"]
    }
  }
}
resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_alb" "be_application_load_balancer" {
  name = "okay-demo-pt-be-lb"
  load_balancer_type = "application"
  subnets = [
    aws_default_subnet.default_subnet_a.id,
    aws_default_subnet.default_subnet_b.id,
    aws_default_subnet.default_subnet_c.id
  ]
  security_groups = [
    aws_security_group.load_balancer_security_group.id]
}

resource "aws_alb" "fe_application_load_balancer" {
  name = "okay-demo-pt-fe-lb"
  load_balancer_type = "application"
  subnets = [
    aws_default_subnet.default_subnet_a.id,
    aws_default_subnet.default_subnet_b.id,
    aws_default_subnet.default_subnet_c.id
  ]
  security_groups = [
    aws_security_group.load_balancer_security_group.id]
}

resource "aws_security_group" "load_balancer_security_group" {
  ingress {
    from_port = 443
    to_port = 443
    protocol = "TCP"
    cidr_blocks = [
      "0.0.0.0/0"]
  }

  ingress {
    from_port = 80
    to_port = 80
    protocol = "TCP"
    cidr_blocks = [
      "0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [
      "0.0.0.0/0"]
  }
}

resource "aws_lb_target_group" "be_target_group" {
  name = "okay-demo-pt-be-target-group"
  port = 443
  protocol = "HTTP"
  target_type = "ip"
  vpc_id = aws_default_vpc.default_vpc.id

  health_check {
    path = "/.well-known/apollo/server-health"
    timeout = 120
    healthy_threshold = 2
    unhealthy_threshold = 10
    interval = 300
  }
}

resource "aws_lb_target_group" "fe_target_group" {
  name = "okay-demo-pt-fe-target-group"
  port = 443
  protocol = "HTTP"
  target_type = "ip"
  vpc_id = aws_default_vpc.default_vpc.id

  health_check {
    path = "/"
    timeout = 120
    healthy_threshold = 2
    unhealthy_threshold = 10
    interval = 300
  }
}

resource "aws_lb_listener" "be_listener" {
  load_balancer_arn = aws_alb.be_application_load_balancer.arn
  port = "443"
  protocol = "HTTPS"
  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.be_target_group.arn
  }

  certificate_arn = var.ssl_certificate_arn
}

resource "aws_lb_listener" "fe_listener" {
  load_balancer_arn = aws_alb.fe_application_load_balancer.arn
  port = "443"
  protocol = "HTTPS"
  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.fe_target_group.arn
  }

  certificate_arn = var.ssl_certificate_arn
}

resource "aws_lb_listener" "be_listener_http" {
  load_balancer_arn = aws_alb.be_application_load_balancer.arn
  port = "80"
  protocol = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port = "443"
      protocol = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "fe_listener_http" {
  load_balancer_arn = aws_alb.fe_application_load_balancer.arn
  port = "80"
  protocol = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port = "443"
      protocol = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_ecs_service" "be_service" {
  name = "okay-demo-pt-be-service"
  cluster = aws_ecs_cluster.be_cluster.id
  task_definition = aws_ecs_task_definition.be_task.arn
  launch_type = "FARGATE"
  desired_count = 1
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent = 200


  load_balancer {
    target_group_arn = aws_lb_target_group.be_target_group.arn
    container_name = aws_ecs_task_definition.be_task.family
    container_port = 5000
  }

  network_configuration {
    subnets = [
      aws_default_subnet.default_subnet_a.id,
      aws_default_subnet.default_subnet_b.id,
      aws_default_subnet.default_subnet_c.id]
    assign_public_ip = true
    security_groups = [
      aws_security_group.service_security_group.id]
  }
}
resource "aws_ecs_service" "fe_service" {
  name = "okay-demo-pt-fe-service"
  cluster = aws_ecs_cluster.fe_cluster.id
  task_definition = aws_ecs_task_definition.fe_task.arn
  launch_type = "FARGATE"
  desired_count = 1
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent = 200


  load_balancer {
    target_group_arn = aws_lb_target_group.fe_target_group.arn
    container_name = aws_ecs_task_definition.fe_task.family
    container_port = 3000
  }

  network_configuration {
    subnets = [
      aws_default_subnet.default_subnet_a.id,
      aws_default_subnet.default_subnet_b.id,
      aws_default_subnet.default_subnet_c.id]
    assign_public_ip = true
    security_groups = [
      aws_security_group.service_security_group.id]
  }
}


resource "aws_security_group" "service_security_group" {
  name = "okay-demo-pt-security-group"
  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    security_groups = [
      aws_security_group.load_balancer_security_group.id]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [
      "0.0.0.0/0"]
  }
}
