import { ref, onMounted, watch } from 'vue';
import { Plugins, CameraResultType, CameraSource, CameraPhoto, 
Capacitor, FilesystemDirectory } from "@capacitor/core";

export function useDashboard() {
    const { Camera } = Plugins;
  
    const scanQr = async () => {
      const cameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      });
    };
  
    return {
      scanQr
    };
  }