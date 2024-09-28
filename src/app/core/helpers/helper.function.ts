import IEventPlanner from "../models/eventPlanner.model";
import { IVenue } from "../models/venue.model";



function checkVenue(item: IEventPlanner | IVenue): item is IVenue{
  return (item as IVenue).venueName !== undefined;
}


function checkEventPlanner(item: IEventPlanner | IVenue): item is IEventPlanner{
  return (item as IEventPlanner).company !== undefined;
}


export {
  checkVenue,
  checkEventPlanner
}
