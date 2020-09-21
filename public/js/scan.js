// $(document).ready(function() {

//     setInterval(function() {
//       $.ajax({
//         "url": "/mesh/scan",
  
//         "success": function(data) {
//             var device=data.payload.devices
//             console.log(data)
//           $("#deviceId").html( device.UUID);
//         },
//         "error": function(error) {
//           console.log(error);
//         }
//       })
//     }, 5000);
//   })