import { Injectable } from '@nestjs/common';
import { point } from '@prisma/client';
import { spawnSync } from 'child_process';

@Injectable()
export class AiService {
  getTag(data: string): string {
    const python = spawnSync('python3', ['src/module/ai/prediction.py', data]);
    console.log(python.stdout.toString());
    let s = python.stdout.toString();
    s = s.replace(/[\[\]]/g, ''); // 대괄호 제거
    s = s.trim(); // 양쪽 공백 제거
    const array = s.split(' ').map(Number); // 공백을 기준으로 분리하고 숫자로 변환
    console.log(array);
    return this.tagging(array);
  }

  tagging(data: Array<number>) {
    const max = Math.max(...data);
    const maxIndex = data.indexOf(max);
    if (maxIndex == 0) {
      return '언빌리버블! 인생';
    } else if (maxIndex == 1) {
      return '스릴 넘치는 인생';
    } else if (maxIndex == 2) {
      return '뜨겁게 불타는 인생';
    } else if (maxIndex == 3) {
      return '차분하고 감성적인 인생';
    } else if (maxIndex == 4) {
      return '소나무같은 인생';
    } else if (maxIndex == 5) {
      return '간이 배 밖에 나온 인생';
    } else if (maxIndex == 6) {
      return '온화하고 평화로운 인생';
    }
  }
}
