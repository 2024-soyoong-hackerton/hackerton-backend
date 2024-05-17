import { Injectable } from '@nestjs/common';
import { point } from '@prisma/client';
import { spawn } from 'child_process';

@Injectable()
export class AiService {
  getTag(data: Partial<point>[]): number {
    const x = [];
    const y = [];
    data.forEach((item) => {
      x.push(item.x);
      y.push(item.y);
    });

    let output;
    const python = spawn('python3', [
      'prediction.py',
      x.toString(),
      y.toString(),
    ]);
    python.stdout.on('data', (result) => {
      output = result.toString;
    });
    return output;
  }

  tagging(data: number) {
    if (data < -9.8) {
      return '어떤 인생을 살아오신건가요...?'
    } else if (data < -8) {
      return '반등이 눈앞! 포기하지 않는 인생';
    } else if (data < -3) {
      return '생각해보면 좋은 일도 있을거에요';
    } else if (data < 3) {
      return '인생사 새옹지마! 어떻게 될지 모르는 인생';
    } else if (data < 8) {
      return '이대로만 가자!인생';
    } else if (data < 9.8) {
      return '끊없이 발전하는 인생';
    } else {
      return '조증인생'
    }
  }
}
