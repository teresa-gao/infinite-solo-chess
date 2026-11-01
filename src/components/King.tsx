import Piece from './Piece.tsx'

interface KingProps {
    isWhite: boolean;
    dragId: string;
}

export default function King({ isWhite, dragId }: KingProps) {
    return (
        <Piece
            type="k"
            isWhite={isWhite}
            dragId={dragId}
        />
    )
}
