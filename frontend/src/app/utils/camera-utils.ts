export async function initCamera(videoElement: HTMLVideoElement) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      videoElement.srcObject = stream
      return true
    } catch (error) {
      console.error('Error accessing camera:', error)
      return false
    }
  }
  
  export function stopCamera(videoElement: HTMLVideoElement) {
    const stream = videoElement.srcObject as MediaStream
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      videoElement.srcObject = null
    }
  }
  
  