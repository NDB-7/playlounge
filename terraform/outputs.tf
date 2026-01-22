output "instance_public_ip" {
  description = "Public IP address of app server"
  value       = aws_instance.app_server.public_ip
}

output "instance_public_dns" {
  description = "Public DNS of app server"
  value       = aws_instance.app_server.public_dns
}