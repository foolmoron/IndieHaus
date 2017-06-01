var gyro = false
var latestYaw = 0
var latestPitch = Math.PI*0.7
var latestRoll = 0
var latestDeviceRotation = 0

window.addEventListener('deviceorientation', function(e) {
    var yaw = e.alpha / 180 * Math.PI
    var pitch = e.beta / 180 * Math.PI
    var roll = e.gamma / 180 * Math.PI
    var x = -Math.cos(yaw) * Math.sin(pitch) * Math.sin(roll) - Math.sin(yaw) * Math.cos(roll)
    var y = -Math.sin(yaw) * Math.sin(pitch) * Math.sin(roll) + Math.cos(yaw) * Math.cos(roll)
    var z = Math.cos(pitch) * Math.sin(roll)
    var angle = Math.atan2(y, x)
    gyro = true
    latestYaw = yaw
    latestPitch = pitch
    latestRoll = roll
    latestDeviceRotation = angle
})

window.addEventListener('mousemove', function(e) {
    gyro = false
})

var flexItems = document.querySelectorAll('.other > *')
function updateFlexboxes() {
    if (!gyro) {
        for (var i = 0; i < flexItems.length; i++) {
            flexItems[i].style.flexGrow = null
        }
        return
    }
    if (latestPitch <= 0) {
        flexItems[0].style.flexGrow = 1
        for (var i = 1; i < flexItems.length; i++) {
            flexItems[i].style.flexGrow = 10
        }
        flexItems[flexItems.length - 1].style.flexGrow = 45
    } else if (latestPitch <= Math.PI*0.8) {
        flexItems[0].style.flexGrow = 3
        for (var i = 1; i < flexItems.length; i++) {
            flexItems[i].style.flexGrow = 55
        }
        flexItems[flexItems.length - 1].style.flexGrow = 45
    } else {
        flexItems[0].style.flexGrow = 200
        for (var i = 1; i < flexItems.length; i++) {
            flexItems[i].style.flexGrow = 10
        }
    }
}

var lastCalled = performance.now();
function updateFlexboxesThrottled() {
    var now = performance.now();
    if (now - lastCalled > 250) {
        lastCalled = now;
        updateFlexboxes();
    }
    requestAnimationFrame(updateFlexboxesThrottled)
}
updateFlexboxesThrottled()