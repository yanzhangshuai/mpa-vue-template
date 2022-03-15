export declare interface GlobalProps {
  /**
   * 版本号
   */
  VERSION: string;

  /**
   * 文件服务器路径
   */
  FILE_PATH_PREFIX: string;

  DEV: boolean;

  /**
   * 日期格式化
   */
  dateFormat: (date: number | Date, template?: string) => string;
}
