from locust import HttpUser, between, task

class WebsiteUser(HttpUser):
    wait_time = between(5, 15)
    token = None

    def on_start(self):
        response = self.client.post(
            "/auth/login", {"email": "client@example.com", "password": "password"}
        )
        if response.ok:
            self.token = response.json().get("access_token")
        else:
            print("Failed to authenticate. Status code:", response.status_code)
            self.token = None

    @task
    def index(self):
        self.client.get("/")

    
    def upgrade(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.client.post("/upgrade", headers=headers)
        if response.status_code == 201:
            print("/upgrade : successfull")
        else:
            print("/upgrade : failed")

    @task
    def profile(self):
        if self.token:
            headers = {"Authorization": f"Bearer {self.token}"}
            response = self.client.get("/profile/", headers=headers)
            if response.status_code == 401:
                # Token expired, re-authenticate
                print("Token expired. Re-authenticating...")
                self.on_start()
            elif response.status_code == 429:
                # If too many requests
                print("/profile : Too many requests!")
                self.upgrade()
                
            elif response.status_code == 200:
                # Successfully fetched profile
                print("/profile : fetched successfully!")
            else:
                # Handle other status codes if needed
                print("/profile : Failed to fetch. Code:", response.status_code)
        else:
            print("/profile : No valid token.")
