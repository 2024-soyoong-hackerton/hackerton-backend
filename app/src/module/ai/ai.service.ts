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
    let array = s.split(' ').map(Number); // 공백을 기준으로 분리하고 숫자로 변환
    console.log(array);
    return this.tagging(array);
  }

  tagging(data: Array<number>) {
    const max = Math.max(...data);
    const maxIndex = data.indexOf(max);
    if (maxIndex == 0) {
      return '놀람';
    } else if (maxIndex == 1) {
      return '공포';
    } else if (maxIndex == 2) {
      return '분노';
    } else if (maxIndex == 3) {
      return '슬픔';
    } else if (maxIndex == 4) {
      return '중립';
    } else if (maxIndex == 5) {
      return '혐오';
    } else if (maxIndex == 6) {
      return '행복';
    }
  }
}
