export function mergeUniqueById<T extends { id: number | string }>(
    existingList: T[],
    newList: T[]
): T[] {
    const existingIds = new Set(existingList.map((item) => item.id))
    return [
        ...existingList,
        ...newList.filter((item) => !existingIds.has(item.id))
    ]
}
