import Piece from './Piece.tsx'

interface BishopProps {
    isWhite: boolean;
    dragId: string;
}

export default function Bishop({ isWhite, dragId }: BishopProps) {
    return (
        <Piece
            type="bishop"
            isWhite={isWhite}
            dragId={dragId}
        />
    )
}
