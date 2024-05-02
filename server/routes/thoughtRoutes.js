import { Router } from "express";
import * as thoughtController from "../controllers/thought.controllers.js";

const router = Router();

// TEST
router.route('/test')
    .get(thoughtController.test)

// CREATE THOUGHT
router.route('/')
    .post(thoughtController.createThought)

// GET ALL THOUGHTS
router.route('/')
    .get(thoughtController.getAllThoughts)

// GET ONE THOUGHT
router.route('/:id')
    .get(thoughtController.getOneThought)
    .put(thoughtController.updateOneThought)
    .delete(thoughtController.deleteOneThought)

export default router;