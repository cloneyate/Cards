import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

export async function takePhoto () {
  const { Camera } = Plugins;
  const cameraPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100
  });
  return cameraPhoto;

}

export async function getClipboard () {
  const { Clipboard } = Plugins;
  let result = await Clipboard.read();
  console.log('Got', result.type, 'from clipboard:', result.value);
  return result.value
}

export async function writeClipboard (string) {
  const { Clipboard } = Plugins;
  await Clipboard.write({
    string
  });
  console.log('Write to clipboard:', string);
}

export async function shareCard (cid) {
  const { Share } = Plugins;
  let shareRet = await Share.share({
    title: 'I share a card to you!',
    text: '我给你分享了一张卡片，快来看看吧！',
    url: 'https://callet.tk/card/' + cid,
    dialogTitle: 'Share card'
  });
  return shareRet
}


export async function scanQr () {
  const result = await BarcodeScanner.scan()
  alert(result.text)
  return result
}

export async function changeStatusBar (color) {
  const { StatusBar } = Plugins
  try {
    StatusBar.setBackgroundColor({ color })
  } catch (error) {
    console.log(error)
  }
}

