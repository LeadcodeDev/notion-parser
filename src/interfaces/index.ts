import Block from '../entities/blocks/Block'
import Bookmark from '../entities/blocks/Bookmark'
import BulletedList from '../entities/blocks/BulletedList'
import Code from '../entities/blocks/Code'
import Divider from '../entities/blocks/Divider'
import Image from '../entities/blocks/Image'
import NumberedList from '../entities/blocks/NumberedList'
import Paragraph from '../entities/blocks/Paragraph'
import Quote from '../entities/blocks/Quote'
import Table from '../entities/blocks/Table'
import Title from '../entities/blocks/Title'
import Todo from '../entities/blocks/Todo'
import Toggle from '../entities/blocks/Toggle'
import Video from '../entities/blocks/Video'

export interface CoverImage {
  type: string
  external: External
}

export interface External {
  url: string
}

export interface Icon {
  type: string
  emoji: string
}

export interface Annotation {
  bold: false,
  italic: false,
  strikethrough: false,
  underline: false,
  code: false,
  color: string
}

export interface RichText {
  content: string
  link: string | null
}

export enum HeadingLevel {
  h1 = 1,
  h2 = 2,
  h3 = 3
}

export interface HtmlConfig {
  separator?: string
  h1?: string,
  h2?: string
  h3?: string
  p?: string
  a: string
  quote?: string
  bookmark?: {
    url?: string
  }
  code?: {
    container?: string
    text?: string
  }
  video?: {
    caption?: string
    container?: string
  }
  toggle?: {
    container?: string
    summary?: string
  }
  image?: {
    preview?: string
    caption?: string
  }
  bulletedList?: {
    content?: string
  }
  numberedList?: {
    content?: string
  }
  divider?: string
  table?: {
    head?: { tr: string, td: string }
    body?: { tr: string, td: string }
  }
  todo?: {
    container: string
    input?: string
    content?: string
  }
}

export type BlockType = 'block' | 'bookmark' | 'bulleted-list' | 'code' | 'divider' | 'image' | 'numbered-list' | 'paragraph' | 'quote' | 'table' | 'text' | 'title' | 'todo' | 'toggle' | 'video'
export type BlockContract = Block & Bookmark & BulletedList & Code & Divider & Image & NumberedList & Paragraph & Quote & Table & Text & Title & Todo & Toggle & Video