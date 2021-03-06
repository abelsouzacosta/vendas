import { Request, Response } from 'express';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.status(200).json(user);
  }
}
