import Daily from '../models/daily.model';

// async function getDailymcqs(req, res) {
//     try {
//         const daily = await Daily.findOne({day: req.params.day});
//         if (!daily) {
//         return res.status(404).send('Daily not found');
//         }
//         res.send(daily);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal server error');
//     }
// }