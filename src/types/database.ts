export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          user_id: string;
        };
        Insert: {
          user_id: string;
        };
        Update: {
          user_id?: string;
        };
      };
      posts: {
        Row: {
          author_id: string;
          category: string | null;
          content: Json;
          cover_image: string | null;
          created_at: string;
          excerpt: string | null;
          featured: boolean;
          id: string;
          is_published: boolean;
          reading_time: number | null;
          slug: string;
          title: string;
          updated_at: string;
          views: number;
        };
        Insert: {
          author_id: string;
          category?: string | null;
          content: Json;
          cover_image?: string | null;
          created_at?: string;
          excerpt?: string | null;
          featured?: boolean;
          id?: string;
          is_published?: boolean;
          reading_time?: number | null;
          slug: string;
          title: string;
          updated_at?: string;
          views?: number;
        };
        Update: {
          author_id?: string;
          category?: string | null;
          content?: Json;
          cover_image?: string | null;
          created_at?: string;
          excerpt?: string | null;
          featured?: boolean;
          id?: string;
          is_published?: boolean;
          reading_time?: number | null;
          slug?: string;
          title?: string;
          updated_at?: string;
          views?: number;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: {
          uid: string;
        };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
