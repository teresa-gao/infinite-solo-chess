import Piece from './Piece.tsx'

interface KnightProps {
    isWhite: boolean;
    dragId: string;
}

export default function Knight({ isWhite, dragId }: KnightProps) {
    return (
        <Piece
            type="n"
            isWhite={isWhite}
            dragId={dragId}
        />
    )
}
