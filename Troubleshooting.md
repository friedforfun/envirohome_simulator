# Frequently Asked Questions and Troubleshooting

### Frequently Asked Questions


### Troubleshooting
#### First steps:
1. Make sure container is up - 
`$ docker ps`
2. Remove container and volumes - 
`$ docker-compose down -v`
3. Rebuild container: from project root directory run - 
`$ docker-compose build`
4. Check line endings on any shell script files (files ending ".sh") they must be unix line endings!

#### Database problems: 
Table not created:

Check services/web/entrypoint.sh file permissions, should be executable:
`$ chmod +x services/web/entrypoint.sh`

#### Gather docker logs:
If unable to identify problem view the docker compose log, or redirect it to a file and share it with the group.

View log: 
`$ docker-compose logs -f`
