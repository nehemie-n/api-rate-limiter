from locust import HttpUser, between, task


class WebsiteUser(HttpUser):
    wait_time = between(5, 15)

    def on_start(self):
        self.token = self.client.post(
            "/auth/login", {"email": "client@example.com", "password": "password"}
        )

    @task
    def index(self):
        self.client.get("/")

    @task
    def about(self):
        self.client.get("/profile/")
