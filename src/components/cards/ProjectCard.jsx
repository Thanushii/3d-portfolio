import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 330px;
  height: 700px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.card_light};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
  object-fit: contain;
  padding: 10px;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 0px 2px;
  flex: 1;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  height: 56px;
`;

const Date = styled.div`
  font-size: 12px;
  margin-left: 2px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const DescriptionContainer = styled.div`
  margin-top: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Description = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${({ expanded }) => (expanded ? "none" : "5")};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  min-height: ${({ expanded }) => (expanded ? "180px" : "120px")};
  max-height: ${({ expanded }) => (expanded ? "250px" : "120px")};
  transition: all 0.3s ease-in-out;
  overflow-y: ${({ expanded }) => (expanded ? "auto" : "hidden")};
  line-height: 1.5;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.card_light};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 4px;
  }
`;

const ReadMore = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-top: 8px;
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
`;

const Button = styled.a`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  padding: 12px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.card_light};
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.black};
  }
`;

const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <Image src={project.image} alt={project.title} />
      <Details>
        <Title>{project.title}</Title>
        {project.date && <Date>{project.date}</Date>}
        <DescriptionContainer>
          <Description expanded={expanded}>
            {project.description}
          </Description>
          {project.description.length > 200 && (
            <ReadMore onClick={() => setExpanded(!expanded)}>
              {expanded ? "Show Less" : "Read More"}
            </ReadMore>
          )}
        </DescriptionContainer>
      </Details>
      <ButtonGroup>
        {project.github && (
          <Button href={project.github} target="_blank" rel="noopener noreferrer">
            Github
          </Button>
        )}
        {project.web && (
          <Button href={project.web} target="_blank" rel="noopener noreferrer">
            Live Demo
          </Button>
        )}
      </ButtonGroup>
    </Card>
  );
};

export default ProjectCard;
