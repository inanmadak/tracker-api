import BaseController from './base.controller';
import Track from '../models/track';

class TrackController extends BaseController {

  whitelist = [
    'id',
    'start_time',
    'end_time',
    'description',
    'startNow'
  ];

  pageLimit = 10;

   // Middleware to populate post based on url param
  _populate = async (req, res, next) => {
    const { id } = req.params;

    try {
      const track = await Track.findById(id);

      if (!track) {
        const err = new Error('Track not found.');
        err.status = 404;
        return next(err);
      }

      req.track = track;
      next();
    } catch(err) {
      err.status = err.name ==='CastError' ? 404 : 500;
      next(err);
    }
  }

  search = async (req, res, next) => {
    let { text, page, sort } = req.query;

    page = page || 1;
    sort = sort || 'desc';
    const skip = (page - 1) * 10;
    let query = {
      description: new RegExp(text, 'i')
    }

    try {

      const total = await Track.find(query).count();
      const tracks =
        await Track.find(query).lean().skip(skip).limit(this.pageLimit).exec();

      return res.json({
        total: total,
        page: page,
        sort: sort,
        data: tracks
      });
    } catch(err) {
      next(err);
    }
  }

  list = async (req, res, next) => {

    let { sort, page } = req.query;

    page = parseInt(page) || 1;
    sort = sort || 'desc';
    let skip = (page - 1) * 10;

    console.log(req.query)
    try{
      const total = await Track.find({}).count();
      const tracks = await Track.find({}).sort({createdAt: sort }).lean().skip(skip).limit(this.pageLimit).exec();

      return res.json({
        total: total,
        page: page,
        sort: sort,
        data: tracks
      })
    }catch(err){
      return next(err);
    }
  }

  /**
   * req.track is populated by middleware in routes.js
   */

  fetch = (req, res) => {
    res.json(req.track);
  }

  start = async (req, res, next) => {
    // const params = this.filterParams(req.body, this.whitelist);
    const params = req.body;
    console.log(req.params)
    const track = new Track({
      ...params
    });

    try {
      res.status(201).json(await track.save());
    } catch(err) {
      next(err);
    }
  }

  stop = async (req, res, next) => {

    try{
      const { id } = this.filterParams(req.params, this.whitelist);

      const track = await Track.findOne({_id: id}).exec();

      if(track){
        if(track.stop_time){
          return res.status(400).json({ message: 'Track already stopped.', track: track.toJSON()});
        }

        track.stop_time = Date.now();
        return res.json(await track.save());
      }

      return res.json(track);
    }catch(err){
      return res.next(err);
    }
    
  }

  delete = async (req, res, next) => {

      try {
        await Track.remove({_id: req.params.id}).exec();
        res.status(200).json({status: true, id: req.params.id });
      } catch(err) {
        next(err);
      }
  }
}

export default new TrackController();
