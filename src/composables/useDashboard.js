import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";

export function useDashboard() {
    const { Camera } = Plugins;
  
    const scanQr = async () => {
      const cameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      });
      return cameraPhoto
    };
  
    return {
      scanQr
    };
  }