# Build image
build-image:
	docker build -t reservation .

# Run container
run-container:
	docker run -v /mnt/d/saját/mystuff_e/2024/_Freelance/reservations/config/calendar-410807.json:/config/calendar-410807.json -p 3000:3000 -p 5000:5000 reservation
