import Piece from './Piece.tsx'

interface BishopProps {
    isWhite: boolean;
    dragId: string;
}

export default function Bishop({ isWhite, dragId }: BishopProps) {
    return (
        <Piece
            type="b"
            isWhite={isWhite}
            dragId={dragId}
        />
    )
}
