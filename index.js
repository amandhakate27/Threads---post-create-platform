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
       content : "Title: The Most Underrated Productivity Hack I’ve been experimenting with productivity hacks for years — from time-blocking to Pomodoro timers — but I recently discovered something so simple that it completely changed how I work. It’s not about fancy apps, expensive courses, or new gadgets. It’s about micro-commits of focus."

    },
    {
       id : uuidv4(),
       imgSrc : "/assets/man-user-circle-icon.svg",
       name: "Robert Simon",
       username : "robert_x_simon",
       content : "I used to think multitasking made me more productive — checking emails while coding, scrolling social media during meetings, juggling ten tabs at once. Turns out, it was just making me stressed and slower. I tried focusing on one task at a time, even if it meant doing less in a day, and the difference was night and day. Tasks got done faster, with better quality, and I actually enjoyed the process. Sometimes doing less really is doing more. Has anyone else tried single-tasking? How did it change your workflow?"
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
       content : "I never thought doodling in the margins of my notebook would help my work, but it actually did. Whenever I felt stuck on a problem or brainstorming ideas, I’d start drawing random shapes, arrows, or little cartoons. Weirdly enough, it cleared my mind and sparked connections I wouldn’t have noticed otherwise. Now, I carry a small notebook everywhere just for this. Creativity isn’t always about sitting at your desk and forcing ideas — sometimes it’s about letting your brain wander in small, playful ways. Anyone else have a strange habit that actually works?",
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












