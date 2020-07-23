import { useCallback } from 'react';
import videojs from 'video.js';

export function usePlayer(id) {
  return useCallback(() => videojs.getPlayer(id), [id]);
}
