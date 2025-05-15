import { faker } from '@faker-js/faker/locale/en';
import { AddCommentModel } from '@models/comment.model';

export function prepareRandomNewComment(bodySentences = 5): AddCommentModel {
  const body = faker.lorem.sentences(bodySentences);
  const newComment: AddCommentModel = { body: body };
  return newComment;
}
