use arts


//Verify the number of documents in the `artworks` collection
db.artworks.countDocuments()


//To view some sample documents, you can run
db.artworks.find({},{ImageFileName: 1, _id: 0})


// db.artworks.find({"_id": ObjectId("672a7c80bf4ff476e563c840")})

//db.artworks.remove({})

//db.artworks.find({ImageFileName: "114020.jpg"})
