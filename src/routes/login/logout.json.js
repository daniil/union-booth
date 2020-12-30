import { success } from '../../utils/response';

export async function post(req, res) {
  req.session.user = null;
  return success(res, 200, null);
}