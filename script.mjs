import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { setDoc, deleteDoc, updateDoc, collection, doc, getFirestore, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAvYrxXgMZN7MQ853dG84dCWd9YzeQahaI",
    authDomain: "todo-list-9dce6.firebaseapp.com",
    databaseURL: "https://todo-list-9dce6-default-rtdb.firebaseio.com/",
    projectId: "todo-list-9dce6",
    storageBucket: "todo-list-9dce6.appspot.com",
    messagingSenderId: "711721102081",
    appId: "1:711721102081:web:fb32922f272ac97b678900",
    measurementId: "G-VTS6R1FJ4H"
  };
  

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

let todoInp = document.getElementById("todo");

let addTodo = async () => {
    try {
        await setDoc(doc(db, "todos", todoInp.value), {
            todo: todoInp.value
        });
        getData()
    } catch (e) {
        console.log(e);
    }
}

let getData = async () => {
    let show_container = document.querySelector(".show-container");
    let querySnapshot = await getDocs(collection(db, "todos"));
    show_container.innerHTML = ""
    querySnapshot.forEach((doc) => {
        show_container.innerHTML += `
        <div class="main-be" id='${doc.data().todo}'>
          <p>${doc.data().todo}</p>
          <div class="buttons">
          <button onclick="updateInp('${doc.data().todo}')">Update</button>
          <button onclick="deleteTodo('${doc.data().todo}')">Delete</button>
          </div>
          </div>
        `
    });
}
let deleteTodo = async (todo) => {
    await deleteDoc(doc(db, "todos", todo));
    getData()
}

getData()

let updateInp = (todo) => {
    localStorage.setItem("purana-mal", todo)
    document.getElementById(`${todo}`).innerHTML = `
    <div>
          <input value="${todo}" id='${todo}-3' />
          <div class="buttons">
          <button onclick="updateTodo('${todo}')">Set</button>
          <button onclick="deleteTodo('${todo}')">Delete</button>
          </div>
        </div>
    `
}

let updateTodo = async (todo) => {
    let todoRef = doc(db, "todos", localStorage.getItem("purana-mal"));
    let newTodo = document.getElementById(`${todo}-3`).value
    await updateDoc(todoRef, {
        todo: newTodo
    });

    getData()
}

window.addTodo = addTodo
window.updateTodo = updateTodo
window.updateInp = updateInp
window.deleteTodo = deleteTodo
