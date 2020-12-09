import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

export async function takePhoto() {
  const { Camera } = Plugins;
  const cameraPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100
  });
  return cameraPhoto;

}

export async function getClipboard() {
  const { Clipboard } = Plugins;
  let result = await Clipboard.read();
  console.log('Got', result.type, 'from clipboard:', result.value);
  return result.value
}

export async function scanQr(){
  const result=await BarcodeScanner.scan()
  alert(result.text)
  return result
}


