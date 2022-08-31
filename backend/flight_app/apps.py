from django.apps import AppConfig


class FlightAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'flight_app'
    verbose_name: str = "Flight App"
    path: str = "flight_app"
    def __init__(self, app_name:str = name, app_module = path) -> None:
        self.models = self.get_all_models()
        super().__init__(app_name, app_module)

    def get_all_models(self):
        return self.get_models(include_auto_created=True)
    
    def groups(self):
        self.get_model('user_group',require_ready=False)


