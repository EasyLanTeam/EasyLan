import { TournamentPrize } from "./TournamentPrize";

export type Tournament = {
  // Идентификатор
  id?: string;
  // Идентификатор организатора
  initiatorId?: string;
  // Полное (Публичное) имя организатора
  initiatorFullname: string;
  // Дата и время
  datetime: Date;
  // Место проведения - пример: "Екатеринбург, Первомайская, 28"
  location: string;
  // Тип турнира - индивидуальный или командный
  type: number;
  // Игра
  game: string;
  // Формат игры - в зависимости от игры (1 на 1, 5 на 5, или др.)
  gameFormat: string;
  // Призы за турнир - массив формата ["Приз за 1-е место", "Приз за 2-е место", ...rest]
  prizes: Array<TournamentPrize>;
  // Минимальное число участников
  minParticipants: number;
  // Максимальное число участников
  maxParticipants: number;
  // Денежный взнос с каждого участника (руб.)
  fee: number;
  // Дополнительная информация
  additionalInfo?: string;
};
