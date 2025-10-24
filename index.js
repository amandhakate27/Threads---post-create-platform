const express = require("express");
const path = require("path");
const app = express();


const { v4 : uuidv4 } = require ('uuid');
const methodOverride = require('method-override');
const { name } = require("ejs");
const { log } = require("console");


// image upload middleware
//multer configuration
const multer = require('multer');
const storage = multer.diskStorage({
    destination : function (req, file, cb){
        cb(null, './public/uploads');
    },
        // unique filename with original extension
        filename: function (req , file , cb) {
        const uniqueName = Date.now()+'-'+uuidv4()+path.extname(file.originalname);
        cb(null , uniqueName);
    }
});

// this code only filters images 
const fileFilter =  (req, file, cb) =>{
    if (file.mimetype.startsWith('image/')){
        cb(null, true);
    }else{
        cb(new Error ('only imagefiles are allowed!'), false);
    }
};

// upload middleware ready
const upload = multer({
    storage : storage,
    fileFilter: fileFilter,
    limits: {fileSize: 5*1024*1024} // 5 mb max 
});



let port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended : true})); // middelware
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

let threads = [
    {   
       id : uuidv4(),
       imgSrc : "/assets/woman-user-circle-icon.svg",
       name: "Sanjana Mishra",
       username : "sanjana_12_Mishra",
       content : "this is the genuine response i realized when i was in siberia, Russia. how fucking cold it was! Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo laborum, voluptates velit, adipisci reprehenderit odit officiis reiciendis totam tempore nulla aliquid rem dolorum corrupti minus ad, nesciunt nam quae mollitia?"

    },
    {
       id : uuidv4(),
       imgSrc : "/assets/man-user-circle-icon.svg",
       name: "Robert Simon",
       username : "robert_x_simon",
       content : "well! the energy can neither be created nor be destroyed according to the law of conservation of energy it can transform from one place to another and that's literally  true. i have studied the from the unknown person he realized me the fucking truth , i was genuinely shock when i feel some enery around me."
    },
    {       
       id : uuidv4(),
       imgSrc : "/assets/woman-user-circle-icon.svg",
       name : "Elizabeth Thomos",
       username : "elizabeth_thomos",
       content : "hello, did you ever think about it who made us ? , it's a god or any other entity? we trust science because if something happened there is always a reason behind it but what if the things that are beyond science ."
    },
    {
       id : uuidv4(),
       imgSrc : "/assets/man-user-circle-icon.svg",
       name : "Andrew",
       username : "andagola_cocacola",
       content : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia consequatur doloremque, expedita quaerat modi blanditiis possimus necessitatibus nobis, laudantium asperiores provident. Tempora optio molestias recusandae dicta, animi non aspernatur architecto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia consequatur doloremque, expedita quaerat modi blanditiis possimus necessitatibus nobis, laudantium asperiores provident. Tempora optio molestias recusandae dicta, animi non aspernatur architecto!",
    }
];

// to see all threads
app.get("/threads", (req,res)=>{
    res.render("index.ejs", {threads});
});

// to send a form to create new post
app.get('/threads/new', (req,res)=>{
    res.render('new.ejs')
});

// send new thread to main page
app.post('/threads',upload.single('profileImage'),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    
    let {name,username,content} = req.body;
    let id = uuidv4();
    // console.log(id);

    let imgSrc = req.file ? `/uploads/${req.file.filename}` : "/assets/man-user-circle-icon.svg";


    threads.push({id, imgSrc, name,username,content});
    
    console.log(threads);
    
    
    res.redirect("/threads");
})

app.get("/threads/:id", (req,res)=>{
    let {id} = req.params;
    // console.log(id);
    let thread = threads.find((post)=> id === post.id);
    // console.log(thread);
    if (!thread) return res.status(404).render("404.ejs");
    res.render("show.ejs" ,{thread});
})

app.patch("/threads/:id",(req, res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let thread = threads.find((post)=> id === post.id);
    thread.content = newContent;
    res.redirect("/threads");
})

app.get("/threads/:id/edit", (req,res)=>{
    let {id} = req.params;
    let thread = threads.find((post)=> id === post.id);
    res.render("edit.ejs", {thread});

})

app.delete("/threads/:id", (req,res)=>{
    let{id} = req.params;
    threads = threads.filter((post)=> id !== post.id);
    res.redirect("/threads");
})

app.listen(port, () => console.log(`Server running on port ${port}
`));












