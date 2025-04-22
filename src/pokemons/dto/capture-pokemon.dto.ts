import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CapturePokemonDto {
    @ApiProperty({ example: 'c3a9b87f-1122-4db0-a7b1-e2f234fa7909', description: 'UUID del trainee' })
    @IsUUID()
    trainerId: string;
}
