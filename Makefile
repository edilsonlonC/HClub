run-database-local:
	docker compose  up -d principal_db second_db 
down-database-local:
	docker compose  down principal_db second_db	
run-database-test:
	docker compose -f docker-compose-test.yml up -d
down-database-test:
	docker compose -f docker-compose-test.yml down


