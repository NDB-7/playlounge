variable "aws_region" {
  description = "AWS region to deploy resources in"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance's type"
  type        = string
  default     = "t4g.small"
}

variable "vpc_cidr_block" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "app_name" {
  description = "Name of the application"
  type        = string
  default     = "playlounge"
}

variable "ssh_cidr_blocks" {
  description = "CIDR blocks allowed to access EC2 instance via SSH"
  type        = list(string)
  default     = ["0.0.0.0/0"] # Allows all IPs, change this in production!
}

variable "ssh_key_name" {
  description = "Name of SSH key pair"
  type        = string
}