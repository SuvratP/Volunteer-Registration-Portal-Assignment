import express from 'express';
import Applicant from '../Models/Applicant.js'

const router = express.Router();


// @route   POST /api/applicants
// @desc    Register a new applicant

router.post('/', async (req,res)=>{

    try{
    const newApplicnt = new Applicant(req.body);
    const saveApplicant = await newApplicnt.save();
    res.status(201).json(saveApplicant);
    }catch(err){
        console.error(err);
        res.status(400).json({message:'Failed to register applicant', error: err.message })
    }
})

// @route   GET /api/applicants
// @desc    Get all applicants (admin view)

router.get("/",async(req,res)=>{
    try {
        const applicant = await Applicant.find().sort({createdAt:-1})
        res.status(200).json(applicant);

    } catch (err) {
        console.log(err)
        res.status(400).json({message:'Failed to fetch applicants', error: err.message})
    }
})

export default router;