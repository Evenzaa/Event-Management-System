export function getSeatMapForEvent(eventId) {
  return {
    eventId,
    stage: 'STAGE',
    rows: [
      {
        id: 'vip-row',
        label: 'VIP Zone',
        type: 'vip',
        seats: [
          { id: 'vip-1', number: 1, status: 'available' },
          { id: 'vip-2', number: 2, status: 'available' },
          { id: 'vip-3', number: 3, status: 'available' },
          { id: 'vip-4', number: 4, status: 'sold' },
          { id: 'vip-5', number: 5, status: 'sold' },
          { id: 'vip-6', number: 6, status: 'available' },
          { id: 'vip-7', number: 7, status: 'available' },
          { id: 'vip-8', number: 8, status: 'available' },
          { id: 'vip-9', number: 9, status: 'sold' },
          { id: 'vip-10', number: 10, status: 'available' },
        ],
      },
      {
        id: 'row-c',
        label: 'General Admission',
        type: 'general',
        seats: Array.from({ length: 14 }, (_, i) => ({
          id: `ga-${i + 1}`,
          number: i + 1,
          status: [4, 5, 9].includes(i + 1) ? 'sold' : 'available',
        })),
      },
    ],
  };
}