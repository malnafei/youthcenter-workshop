$(document).ready(function () {
    
    //get all tasks by userID  from tasks collection
    var uid = localStorage.getItem("uid");
    console.log(uid);
    //get all tasks by userID  from tasks collection
    db.collection("tasks").where("uid", "==", uid)
    .get()
    .then((querySnapshot) => {
        //add to tasks dive
        querySnapshot.forEach((doc) => {
            var task = doc.data();
            var taskID = doc.id;
            var taskName = task.taskName;
            $("#allTasks").append(`<il class="list-group-item" id="${taskID}">${taskName} <button class="btn btn-danger btn-sm float-right deleteTask" task-id="${taskID}">Delete</button></il>`);
        });
    });

    $("button#addTask").click(function (e) {
        var taskName = $("#taskName").val();
        if (taskName == "") {
            alert("Please enter task name");
        } else {
            db.collection("tasks").add({
                taskName: taskName,
                uid: uid
            })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                alert("Task added successfully");
                window.location.reload();
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
        }



    }); 

    //on deleteTask click event
    $(document).on("click","button.deleteTask",function (e) {
        var taskID = $(this).attr("task-id");
        db.collection("tasks").doc(taskID).delete().then(function() {
            alert("Task deleted successfully");
            window.location.reload();
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        }
        );
    });


});