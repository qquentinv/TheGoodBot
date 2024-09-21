export interface AuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface StreamerResponse {
  data: StreamerData[];
  pagination: StreamerPagination;
}

export interface StreamerData {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: [];
  tags: [];
  is_mature: boolean;
}

export interface StreamerPagination {
  cursor: string;
}
