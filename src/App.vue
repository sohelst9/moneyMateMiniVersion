<template>

  <div class="container">
    <div class="data-container">
      <div class="header">
        <h2>Transaction Records</h2>
        <button class="add-btn" @click="openModal">Add</button>
      </div>
      <h6 v-if="loading" class="loading">Loading...</h6>
      <div class="data-card" v-for="data in datas">
        <h3>Type: {{ data.type }}</h3>
        <p>Date: {{ data.date }}</p>
        <p>Description: {{ data.description }}</p>
        <p class="amount">Amount: ${{ data.amount }}</p>

        <div class="btn-container">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="isModalOpen" class="add_modal_modal">
        <div class="add_modal_modal-content">
          <span class="add_modal_close" @click="closeModal">&times;</span>
          <h2>Add Transaction</h2>
          <form>
            <div class="add_modal_form-group">
              <label for="type" class="add_modal_label">Type</label>
              <input type="text" id="type" class="add_modal_input">
            </div>
            <div class="add_modal_form-group">
              <label for="date" class="add_modal_label">Date</label>
              <input type="date" id="date" class="add_modal_input">
            </div>
            <div class="add_modal_form-group">
              <label for="description" class="add_modal_label">Description</label>
              <input type="text" id="description" required class="add_modal_input">
            </div>
            <div class="add_modal_form-group">
              <label for="amount" class="add_modal_label">Amount</label>
              <input type="number" id="amount" class="add_modal_input">
            </div>
            <button type="submit" class="add_modal_btn">Add Transaction</button>
          </form>
        </div>
      </div>



    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
const datas = ref([]);
const loading = ref(true);
const isModalOpen = ref(false);

//-- fetch data from firebase but not real time data show
// onMounted(async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "MoneyMate"));
//     let Adata = [];
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//       // console.log(doc.data().type)
//       const data = {
//         id: doc.id,
//         type: doc.data().type,
//         date: new Date(doc.data().date.seconds * 1000).toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "long",
//           day: "numeric"
//         }),
//         description: doc.data().description,
//         amount: doc.data().amount,
//       }
//       Adata.push(data)
//     });
//     datas.value = Adata
//   } catch (error) {

//   } finally {
//     loading.value = false
//   }
// })

//--- fire base real time data fetch
onMounted(() => {
  loading.value = true;
  try {
    onSnapshot(collection(db, "MoneyMate"), (querySnapshot) => {
      let Adata = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          type: doc.data().type,
          date: new Date(doc.data().date.seconds * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }),
          description: doc.data().description,
          amount: doc.data().amount,
        }
        Adata.push(data)
      });
      datas.value = Adata
      loading.value = false;
    });
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
})


//--open modal
const openModal = () => {
  isModalOpen.value = true;
}

//--closeModal
const closeModal = () =>{
  isModalOpen.value = false;
}
</script>


<style scoped>
.container {
  max-width: 700px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.add-btn {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.data-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background-color: #f3f3f3;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.data-card {
  padding: 15px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.data-card h3 {
  font-size: 1.2em;
  margin: 0;
  color: #333;
}

.data-card p {
  margin: 5px 0;
  color: #555;
  font-size: 0.95em;
}

.data-card .amount {
  font-weight: bold;
  color: #007bff;
}

.data-card .btn-container {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.data-card button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.edit-btn {
  background-color: #4CAF50;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.loading {
  font-size: 1.5em;
  color: #007BFF;
  text-align: center;
  padding: 20px;
  animation: bounce 1s infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}


/* Modal Styles */
.add_modal_modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.add_modal_modal-content {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  /* Responsive width */
  max-width: 500px;
  /* Maximum width */
  animation: fadeIn 0.3s;
}

/* Close Button */
.add_modal_close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.add_modal_close:hover,
.add_modal_close:focus {
  color: #ff4d4d;
  text-decoration: none;
  cursor: pointer;
}

/* Form Styles */
.add_modal_form-group {
  margin-bottom: 15px;
}

/* Center the label and input fields */
.add_modal_label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;

}

.add_modal_input[type="text"],
.add_modal_input[type="number"],
.add_modal_input[type="date"] {
  width: calc(100% - 20px);
  /* Full width minus padding */
  margin: 0 auto;
  /* Center align */
  padding: 10px;
  /* Padding for inputs */
  border: 1px solid #ccc;
  /* Light gray border */
  border-radius: 4px;
  /* Slightly rounded corners */
  font-size: 16px;
  /* Font size */
  transition: border 0.3s;
}

.add_modal_input[type="text"]:focus,
.add_modal_input[type="number"]:focus,
.add_modal_input[type="date"]:focus {
  border: 1px solid #007bff;
  outline: none;
}

/* Button Styles */
.add_modal_btn {
  background-color: #007bff;
  /* Primary button color */
  color: white;
  /* White text */
  padding: 10px 15px;
  /* Button padding */
  border: none;
  /* No border */
  border-radius: 4px;
  /* Rounded corners */
  cursor: pointer;
  /* Pointer cursor on hover */
  font-size: 16px;
  /* Font size */
  transition: background-color 0.3s;
  /* Transition for background color */
  width: 100%;
  /* Full width for button */
}

.add_modal_btn:hover {
  background-color: #0056b3;
  /* Darker shade on hover */
}

/* Media Queries for Responsive Design */
@media (max-width: 600px) {
  .add_modal_modal-content {
    padding: 15px;
    /* Reduce padding on smaller screens */
  }

  .add_modal_input[type="text"],
  .add_modal_input[type="number"],
  .add_modal_input[type="date"],
  .add_modal_btn {
    font-size: 14px;
    /* Smaller font size for inputs and buttons */
  }
}
</style>
