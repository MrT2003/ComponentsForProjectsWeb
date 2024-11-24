import { Component } from '@angular/core';

@Component({
  selector: 'app-setting-page',
  standalone: true,
  imports: [],
  templateUrl: './setting-page.component.html',
  styleUrl: './setting-page.component.css'
})
export class SettingPageComponent {
  lokiPath = 'assets/images/loki.jpg';
  avatarPath = 'assets/images/avatar.jpg';
  cameraPath = 'assets/images/camera.png';
  logoutPath = 'assets/images/Log Out.png';
}
