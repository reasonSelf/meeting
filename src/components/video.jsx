export default function Video() {
  navigator.mediaDevices.getDisplayMedia({
    video: true
  })
  .then(stream => {
    document.querySelector('#test').srcObject = stream;
  })
  .catch(error => {

  })

  return (
    <video id="test" width="300" height="300" autoPlay>

    </video>
  )
}