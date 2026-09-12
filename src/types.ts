export type PageRoute =
  | '/'
  | '/how-to-use'
  | '/faq'
  | '/about-us'
  | '/privacy-policy'
  | '/terms-of-service'
  | '/contact';

export type QrSizeOption = 'small' | 'medium' | 'large';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QrConfig {
  value: string;
  size: QrSizeOption;
  fgColor: string;
  bgColor: string;
  level: ErrorCorrectionLevel;
  includeMargin: boolean;
}
