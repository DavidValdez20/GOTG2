// Initialize Firebase
 var config = {
   apiKey: "AIzaSyD9GpNSj-q_1IfujzYCS6FSKwo8sSArAOA",
   authDomain: "gotgv2-f0bb0.firebaseapp.com",
   databaseURL: "https://gotgv2-f0bb0.firebaseio.com",
   projectId: "gotgv2-f0bb0",
   storageBucket: "gotgv2-f0bb0.appspot.com",
   messagingSenderId: "451558192977"
 };
 firebase.initializeApp(config);

 var db = firebase.firestore();

 function write(nombre, decisionTomada, callback){

  var docRef = db.collection("answers").doc(nombre);

  var allData= null;
  docRef.get().then(function(doc){
    if(doc.exists){
      allData=doc.data();
      var valorActual =0;
      if(isNaN(allData[decisionTomada])){
        valoraActual=1;
    }
      else{
        valorActual= allData[decisionTomada]+1;
      }
      docRef.update({
        [decisionTomada]:valorActual
      })
      .then(function(){
        console.log("Document successfully updated!");
        callback();
      })
      .catch(function(error){
        console.error("Error updating document!");
        callback();
      })
  }
  else{
    docRef.set({
      [decisionTomada]:1
    }, {merge: true})
    .then(function(){
      console.log("Document written");
      callback();
    })
    .catch(function(error){
      console.error("Error adding document: ", error);
      callback();

    })
  }
})
 }

 var decisionActual = document.getElementById("momentohistoria").value;

 document.getElementById("opc1").onclick= function(){
   decisionTomada= document.getElementById("txt1").innerHTML;

   write(decisionActual, decisionTomada, function(){window.location.href="01.1.html"})
 }

 document.getElementById("opc2").onclick= function(){
   decisionTomada= document.getElementById("txt2").innerHTML;

   write(decisionActual, decisionTomada, function(){window.location.href="01.2.html"})
    }
