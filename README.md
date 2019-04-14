[NGX-Admin Installation Guidelines](https://akveo.github.io/ngx-admin/docs/getting-started/installation-guidelines#install-ngxadmin)

# Admin template based on Angular 7, Bootstrap 4 and <a href="https://github.com/akveo/nebular">Nebular</a>
<img src="https://i.imgur.com/9SLit5Q.png"/>

## Getting Started

The HR Manager client application is built with Angular 7, Bootstrap 4 and [Nebular](https://github.com/akveo/nebular). It is based on [ngx-admin](https://akveo.com/ngx-admin/pages/dashboard) by [Akveo](http://akveo.com/).

To run the application you need to:
- git clone https://github.com/stefancostin/hr-manager-client.git
- cd hr-manager-client
- npm install
- ng serve --open

You might also need some specific native packages depending on your operating system like 'build-essential' on Ubuntu. You can find more details on the official [ngx-admin page](https://akveo.github.io/ngx-admin/docs/getting-started/installation-guidelines#install-tools).

## Backend Integration

To work with the HR Manager API, you can clone it from the following [link](https://github.com/stefancostin/hr-manager-api).

The application makes calls to the default Laravel path: http://127.0.0.1:8000. This path can be changed inside the 'src/app/pages/shared/api.resource.ts' file.


