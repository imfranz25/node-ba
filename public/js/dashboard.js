/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
// eslint-disable-next-line no-unused-vars
async function deleteHotel(hotelID) {
  const confirmDelete = confirm('Are you sure you to delete this record?');

  if (confirmDelete) {
    axios.post('/hotel/delete', { hotelID })
      .then((response) => {
        location.reload();
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
